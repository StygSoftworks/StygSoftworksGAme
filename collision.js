//function to check if a collision has occurred has occurred between 2 rectangles
function checkCollisionRectangle(rect1, rect2) {

    //check if the rectangles have collided
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        //collision detected
        return true;
    }
    //no collision
    return false;
}

//get a rotated rectangle
function getRotatedRectangle(rect, rotationDegrees) {
    
        //get the center of the rectangle
        var center = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
        };
    
        //get the points of the rectangle
        var points = [
            {
                x: rect.x,
                y: rect.y
            },
            {
                x: rect.x + rect.width,
                y: rect.y
            },
            {
                x: rect.x + rect.width,
                y: rect.y + rect.height
            },
            {
                x: rect.x,
                y: rect.y + rect.height
            }
        ];
    
        // rotate the points by the rotation degrees
        for (var i = 0; i < points.length; i++) {
            points[i] = rotatePoint(points[i], center, rotationDegrees);
        }
    
        //get the new rectangle
        var newRect = {
            x: points[0].x,
            y: points[0].y,
            width: points[2].x - points[0].x,
            height: points[2].y - points[0].y,
            topRight: points[1], //new
            bottomRight: points[2], //new
            bottomLeft: points[3], //new
            topLeft: points[0] //new
        };
    
        //return the new rectangle
        return newRect;
}


function rotatePoint(point, center, angle) {

    //get the angle in radians
    var radians = angle * Math.PI / 180;

    //get the distance between the point and the center
    var distance = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));

    //get the angle between the point and the center
    var anglePoint = Math.atan2(point.y - center.y, point.x - center.x);

    //get the new angle
    var newAngle = anglePoint + radians;

    //get the new point
    var newPoint = {
        x: center.x + distance * Math.cos(newAngle),
        y: center.y + distance * Math.sin(newAngle)
    };

    //return the new point
    return newPoint;
}



//get the points of the rectangle rotated by x degrees
function getRotatedRectanglePoints(rect, rotationDegrees) {
    
        //get the center of the rectangle
        var center = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
        };
    
        //get the points of the rectangle
        var points = [
            {
                x: rect.x,
                y: rect.y
            },
            {
                x: rect.x + rect.width,
                y: rect.y
            },
            {
                x: rect.x + rect.width,
                y: rect.y + rect.height
            },
            {
                x: rect.x,
                y: rect.y + rect.height
            }
        ];
    
        // rotate the points by the rotation degrees
        for (var i = 0; i < points.length; i++) {
            points[i] = rotatePoint(points[i], center, rotationDegrees);
        }

        //return the points
        return points;
    }

//function to check if a collision has occurred has occurred between a rectangle and a rotated rectangle
function checkCollisionRectangleRotated(rect1, rect2, rotationDegrees1, rotationDegrees2) {
    
        //get the points of the rotated rectangles
        var points1 = getRotatedRectanglePoints(rect1, rotationDegrees1);
        var points2 = getRotatedRectanglePoints(rect2, rotationDegrees2);
    
        //loop through the points of the first rectangle
        for (var i = 0; i < points1.length; i++) {
            //get the point
            var point = points1[i];
    
            //check if the point is inside the second rectangle
            if (point.x > rect2.x && point.x < rect2.x + rect2.width &&
                point.y > rect2.y && point.y < rect2.y + rect2.height) {
                //collision detected
                return true;
            }
        }
    
        //loop through the points of the second rectangle
        for (var i = 0; i < points2.length; i++) {
            //get the point
            var point = points2[i];
    
            //check if the point is inside the first rectangle
            if (point.x > rect1.x && point.x < rect1.x + rect1.width &&
                point.y > rect1.y && point.y < rect1.y + rect1.height) {
                //collision detected
                return true;
            }
        }
    
        //no collision
        return false;
    }       
