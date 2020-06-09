export class IP{
    ip: string
    city: string
    region: string
    country: string
    currency: string
    
    static fromJson(json: any): IP {
        const ip = new IP()
        json = json || {}

        ip.ip = json.ip
        ip.city = json.city
        ip.region = json.region
        ip.country = json.country_name
        ip.currency = `${json.currency_name}-${json.currency}`
        return ip
    }
}
