# How to Run
1. Navigate to the downloaded files where the current working directory is `airplane-visualization`
3. Given npm is installed on the local machine, run `npm run build`
4. Next, run `npm run preview`
5. You should now be able to access the simulation using [localhost](http://localhost:4173/)
6. Enter the desired values for speed and yaw angle, then press apply.
7. Repeat step 6 as much as you would like!

# Math Breakdown
By using the kinematic equations:
 
x = x<sub>o</sub> + v * cos($\theta$) * $\Delta$ * T and 

y = y<sub>o</sub> + v * sin($\theta$) * $\Delta$ * T, 

where: 

y = current y position

x = current x position

x<sub>o</sub> = initial x position

y<sub>o</sub> = initial y position

v = current velocity (user input)

$\theta$ = difference between previous user input and current input of daw

$\Delta$ * T = change in time, which is defined as a constant value = 0.1

We are able to calculate the new position of the airplane given a change in velocity and angle. cos($\theta$) gives us the horizontal component of the v vector, while sin($\theta$) gives us the vertical component. $\Delta$ * T is defined as the change in time between the changes in position. Note: $\Delta$ * T is multiplied by 10 for scaling purposes due to the small size of the canvas. 

By storing the position of the airplane, we are able to draw the trajectory using the previous values and the relative distance from the current position.