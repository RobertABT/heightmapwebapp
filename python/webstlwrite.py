#Written by ChocolateBubbles and RobertABT, 2014
#I strongly believe the .whatever format should be universal...

import region,sys

from pylab import imread
from scipy.ndimage import gaussian_filter
from stl_tools import numpy2stl
file = open('out.txt','w')
file.write("begin \n")
# usrselectedcoords = raw_input("Please enter desired Ordnance Survey map reference to be used: ")
usrselectedcoords = sys.argv[1]
usrselectedheight = sys.argv[2]
file.write("got past usr \n")
r = region.Region()
file.write("got past define region \n")
r.readgr (usrselectedcoords)
file.write("got past readgr \n")
filename = str('../public/generated/GENERATED_' + usrselectedcoords + '_scale_' + usrselectedheight + '.stl')
file.write("got to filename \n")
numpy2stl((r.grid / int(usrselectedheight)),filename, solid=True)
file.write("numpy2stl successfull \n")
file.write('finished')
