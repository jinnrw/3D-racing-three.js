export default function DrawLogic(namesArray) {
    console.log('Drawing');

    var speed = 50;
    var namesLength = namesArray.length;

    if (namesArray.length <= 3) {
        speed = 4800;
    } else if (namesArray.length <= 5) {
        speed = 2000;
    } else if (namesArray.length <= 10) {
        speed = 1250;
    } else if (namesArray.length <= 20) {
        speed = 500;
    }

    if (namesLength > 1) {
        setTimeout((speed) => {

            let index = Math.floor(Math.random() * namesLength);

            namesArray.splice(index, 1);
            this.Drawlogic(); // Loop Drawlogic func
        }, speed);
    }

    return namesArray;
}