##HeightMap Web App##

This code runs the website os2stl.co.uk

This is a web interface for the height map Python script. 


run npm install in the directory to install the node modules
(for installing nodejs run the following)
"
sudo apt-get install curl
curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
sudo apt-get install nodejs
"
python dependencies/modules

* python-numpy
* python-matplotlib
* python-scipy

also needed

* sudo apt-get install python-pip
* sudo pip install stl_tools (this can take a long time)
* you need to run npm install as well

for installation info for these view github.com/robertabt/heightmap

live version @ os2stl.co.uk

this version can run behind a proxy by running server-proxy.js and modifying line 36 and 37
