##HeightMap Web App##

This code runs the website os2stl.co.uk

This is a web interface for the height map Python script. 


run npm install in the directory to install the node modules
(for installing nodejs run the following)

"
sudo apt-get install curl

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt-get install nodejs
"


python dependencies/modules

* apt install python3-pip
* pip3 install stl_tools (this can take a long time)
* pip3 install numpy
* pip3 install matplotlib
* pip3 install scipy


for installation info for these view github.com/robertabt/heightmap

live version @ os2stl.co.uk

this version can run behind a proxy by running server-proxy.js and modifying line 36 and 37
