import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js"

import wallet from "./dev-wallet.json"

// Import our dev wallet keypair from the wallet file
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Define our WBA public key
const to = new PublicKey("6eGKgDhFAaLYkxoDMyx2NU4RyrSKfCXdRmqtjT7zodxQ");

//Create a Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey:  to,
                lamports: LAMPORTS_PER_SOL/100,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        
        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log(`Success! Check out your TX here: 
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

//Functions could not be performed at the same time, due to custom program error 0x1 (not enough funds).
//They could be performed if the commitment is 'finalized' perhaps

(async () => {
    try {
        // Get balance of dev wallet
        const balance = await connection.getBalance(from.publicKey)

        // Create a test transaction to calculate fees
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;

        // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
        const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;

        // Remove our transfer instruction to replace it
        transaction.instructions.pop();

        // Now add the instruction back with correct amount of lamports
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );

        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log(`Success! Check out your TX here: 
        https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

