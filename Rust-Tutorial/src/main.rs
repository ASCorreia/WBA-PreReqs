mod print;
mod vars;
mod types;
mod string;
mod tuples;
mod array;
mod vectors;
mod conditionals;
mod loops;
mod functions;
mod pointer_ref;
mod structs;
mod enums;
mod cli;

fn main() {
    print::run();
    vars::run();
    types::run();
    string::run();
    tuples::run();
    array::run();
    vectors::run();
    conditionals::run();
    loops::run();
    functions::run();
    pointer_ref::run();
    structs::run();
    enums::run();
    cli::run();
}
