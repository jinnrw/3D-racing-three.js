export default function DrawLogic(nominationsArray, player) {
    console.log('Drawing');

    var speed = 10;
    // if (nominationsArray.length <= 3) {
    //     speed = 4800;
    // } else if (nominationsArray.length <= 5) {
    //     speed = 2000;
    // } else if (nominationsArray.length <= 10) {
    //     speed = 1250;
    // } else if (nominationsArray.length <= 20) {
    //     speed = 500;
    // }

        setTimeout((speed) => {
            let index = Math.floor(Math.random() * nominationsArray.length);
            let drawnName = nominationsArray[index]

            nominationsArray.splice(index, 1);
            // Check elimination
            if (!nominationsArray.includes(drawnName)) {
                console.log(drawnName);
                
                for (let i = 0; i < player.length; i++) {
                    if (player[i].name === drawnName) {
                        player[i].eliminated = true;
                    }
                }
            }

            this.Drawlogic(); // Loop Drawlogic func
        }, speed);

        // console.log(nominationsArrayLength);
        

    return nominationsArray;
}