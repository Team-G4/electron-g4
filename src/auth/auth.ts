import { EventEmitter } from "../util/events"

const apiEndpoint = "https://g4-leaderboard.herokuapp.com"

export class Account extends EventEmitter {
    private userUUID: string
    private accessToken: string
    public userName: string

    async request(endpoint: string, body: any): Promise<Response> {
        return fetch(
            apiEndpoint + endpoint,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        )
    }

    async logout() {
        await this.request(
            "/userLogout",
            { uuid: this.userUUID }
        )

        this.userUUID = null
        this.userName = null
        this.accessToken = null
    }
}