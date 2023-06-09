//Variables hold primitive data or references to data
//Variables are immutable by default
//Rust is a block-scoped language

pub fn run() {
    let name = "Andre";
    let mut age = 36;
    println!("My name is {} and I am {}", name, age);

    age = 37;
    println!("My name is {} and I am {}", name, age);

    //Define constant
    const ID: i32 = 001;
    println!("id: {}", ID);

    //Assingm multiple vars
    let (my_name, my_age) = ("Andre", 36);
    println!("{} is {}", my_name, my_age);
}