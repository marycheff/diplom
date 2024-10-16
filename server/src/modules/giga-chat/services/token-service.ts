import axios from "axios"
import * as qs from "querystring"

const httpsAgent = new (require("follow-redirects").https.Agent)({ rejectUnauthorized: false })

function generateUUID(): string {
    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = getRandomInt(0, 15)
        const v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export async function getAccessToken(authData: string): Promise<string> {
    const postData = qs.stringify({ scope: "GIGACHAT_API_PERS" })
    const options = {
        method: "POST",
        url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            RqUID: generateUUID(),
            Authorization: `Bearer ${authData}`,
        },
        data: postData,
        httpsAgent,
    }

    try {
        const response = await axios(options)
        if (response.data.access_token) {
            return response.data.access_token
        } else {
            throw new Error("Access token not found in response")
        }
    } catch (error: any) {
        throw new Error(`Error fetching access token: ${error.message}`)
    }
}
