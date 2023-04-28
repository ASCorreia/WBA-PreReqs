pub fn run() {
    //Print to console
    println!("Hello form the print.rs file");

    println!("Number: {}", 1);

    //Basic formatting
    println!("{} is from {}", "Andre", "Solana");

    //Positional Arguments
    println!("{0} is from {1} and {0} likes to {2}", "Andre", "Solana", "Code");

    //Named Arguments
    println!("{name} likes to {activity}", name = "Andre", activity = "Code");

    //Placeholder traits
    println!("Binary: {:b}\nHex: {:x}\nOctal: {:o}", 10, 10, 10);

    //Placeholder for debug trait
    println!("Tuple: {:?}", (12, true, "hello"));

    //Basic math
    println!("10 + 10 = {}", 10 + 10);
}