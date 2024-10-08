const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { mplTokenMetadata, createNft, fetchDigitalAsset, fetchAllDigitalAsset, verifyCollectionV1,
    fetchAllDigitalAssetByOwner, findMetadataPda, printSupply } = require('@metaplex-foundation/mpl-token-metadata');
const { generateSigner, signerIdentity, sol, createSignerFromKeypair, percentAmount, publicKey } = require('@metaplex-foundation/umi');
const {sha256} = require("js-sha256");

const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

function generateSignature(){
    return generateSigner(umi);
}

async function mint(id, mint){
    const key = new Uint8Array(JSON.parse(process.env.PAYER_KEY));
    const ownerkp = umi.eddsa.createKeypairFromSecretKey(key);
    const owner = createSignerFromKeypair(umi, ownerkp);

    umi.use(signerIdentity(owner));
    console.log("MINT, authority public key: ", owner.publicKey.toString());

    console.log("MINT", mint.publicKey);
    await createNft(umi, {
        authority: owner.publicKey, 
        mint,
        name: "UnifyGiving Receipt", //Name of NFT
        uri: `https://ug-hackathon-app.onrender.com/nft/${id}.json`, //The metadata json location
        sellerFeeBasisPoints: percentAmount(0),
        isMutable: false,
        printSupply: printSupply("Limited", [0]),
    }).send(umi); // .send(umi)

    return mint.publicKey;
}

function nftMetadata(donateeId, donateeName, amount, donorName, donationDate){
    const nftMeta = {
        name: "UnifyGiving Receipt",
        symbol: "UGR",
        description: "Unifygiving - the Netflix of Giving",
        external_url: "https://ughackathonapp.onrender.com/",
        seller_fee_basis_points: 0,
        image: `https://ughackathonapp.onrender.com/nft/${donateeId}.png`,
        properties: {
            files: [
                {
                    uri: `https://ughackathonapp.onrender.com/nft/${donateeId}.png`,
                    type: "image/png"
                },
                {
                    uri: `https://ughackathonapp.onrender.com/nft/${donateeId}.mp4`,
                    type: "video/mp4"
                }
            ],
            categorty: "video",
        },
        attributes: [
            {trait_type: "recipient", value: donateeName},
            {trait_type: "amount", value: amount},
            {trait_type: "donatedBy", value: donorName},
            {trait_type: "donationDate", value: donationDate},
        ],
        animation_url: `https://ughackathonapp.onrender.com/nft/${donateeId}.mp4`,
    };
    return nftMeta;
}

exports.mint = mint;
exports.nftMetadata = nftMetadata;
exports.generateSignature = generateSignature;