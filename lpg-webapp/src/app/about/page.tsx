
export default function About() {
    return (
        <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
            <h1 className="text-3xl font-bold">About</h1>
            <p className="text-center">
                The goal of this application is to help you decide which laptop has the most value,
                and give you more information when looking at a laptop to buy.
            </p>
            <p className="text-center">
                This application was created by Parathan Vakeesan and Jaakulan Subeethakumar.
                All Data was taken from userbenchmark.com. This is an open source project on Github. The source code for this application can be found at{' '}
                <a
                    href="https://github.com/parathan/laptop-price-gauge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    this GitHub repository
                </a>.
            </p>
        </div>
    )
}