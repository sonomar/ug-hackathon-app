import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import * as web3 from "@solana/web3.js";

export const getSolanaReceipts = http.get("/api/web3/receipts", async({request})=> {
    
});