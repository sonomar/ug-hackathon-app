import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const user = {
    username: "dum",
    wallet: "kjfdslkfjlsd",
    token: "DJSLFKDJSFKLDJS",
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateReceipts(count = 10) {
    return Array.apply(null, { length: count }).map((_, index) => {
        return {
            date: faker.date.recent({ days: 180 }),
            amount: getRandomInt(1000) + 10,
            recipient: faker.person.fullName(),
            city: faker.location.city(),
            country: faker.location.country(),
            currency: faker.finance.currencySymbol(),
        }
    });
}

const receipts = generateReceipts(20);
receipts.sort((a, b) => {
    if (a.date === b.date) return 0;
    return a.date > b.date ? 1 : -1;
});

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

export const handlers = [
    http.post("/api/login", async ({ request }) => {
        const credentials = await request.json();
        await delay(1000);
        console.log(credentials);
        if (credentials.username == user.username)
            return HttpResponse.json({ user: user, token: user.token }, { status: 200 });
        return HttpResponse.json({ message: "username or password incorrect" }, { status: 401, message: "DXXX" });
    }),
    http.get("/api/receipts", async ({ request }) => {
        await delay(1000);
        return HttpResponse.json(receipts);
    }),
    http.get("/api/countries", async ({ request }) => {
        return HttpResponse.json(
            faker.definitions.location.country
        );
    }),
    http.get("/api/charities", async ({ request }) => {
        return HttpResponse.json(
            Array.apply(null, { length: 4 }).map((_, index) => {
                return {
                    id: index,
                    name: faker.company.name(),
                    city: faker.location.city(),
                    country: faker.location.country()
                }
            })
        )
    }),
    http.get("/api/charity/:id", async ({ params }) => {
        const { id } = params;
        const donatees = Array.apply(null, { length: 4 }).map((_, index) => {
            return {
                id: id*10 + index,
                name: faker.animal.dog(),
                "type": "dog",
                birthday: faker.date.past({years: 10}),
            }
        });
        return HttpResponse.json({
            id: id,
            name: faker.company.name(),
            city: faker.location.city(),
            country: faker.location.country(),
            donatees
        });
    }),
    http.put("/api/donate", async({request}) => {
        const requestBody = await request.json();

        return HttpResponse.json({
            mint: "AGrdXTtjNYFazdHP31Jzmh4X3MwuWNakfjrCkHhfNTqP",
            hash: "FJKLDSJFLKDSJFLDKSJFS",
            ...requestBody
        })
    }),
];