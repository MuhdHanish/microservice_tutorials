import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
    private _client?: Stan;

    get client() {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }
        return this._client;
    }

    connect(clusterID: string, clientID: string, url: string) { 
        this._client = nats.connect(clusterID, clientID, {
            url,
            reconnect: true,         // Enable auto-reconnect
            maxReconnectAttempts: 5, // Number of retry attempts
            reconnectTimeWait: 2000  // Wait time between retries (ms)
        });
        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                resolve();
            });
            this.client.on('error', (err) => {
                reject(err);
            });
        });
    }
}

export const natsWrapper = new NatsWrapper();