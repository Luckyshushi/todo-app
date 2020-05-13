let parameters = {
    firstName: "Xurshida",
    lastName:"Saydullayeva",
    driveCar() {
        function imNotAMethod(){
            console.log(this.firstName)
        }
        imNotAMethod.call(parameters);
        console.log(this.firstName + " " + this.lastName + " " + "is driving a car")
    }
};

parameters.driveCar();