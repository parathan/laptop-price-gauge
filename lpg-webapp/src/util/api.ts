export default function apiUrl() {
    if (process.env.NEXT_PUBLIC_API_TYPE === "prod") {
        return process.env.NEXT_PUBLIC_API_PROD
    } else {
        return process.env.NEXT_PUBLIC_API_LOCAL
    }
}