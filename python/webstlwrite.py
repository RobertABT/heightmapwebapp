#Written by ChocolateBubbles, 2014
#I strongly believe the .whatever format should be universal...

import region,sys

from pylab import imread
from scipy.ndimage import gaussian_filter
from stl_tools import numpy2stl
# usrselectedcoords = raw_input("Please enter desired Ordnance Survey map reference to be used: ")
print "Running " + sys.argv[1]
usrselectedcoords = sys.argv[1]
print "Running " + sys.argv[2]
usrselectedheight = sys.argv[2]

r = region.Region()
r.readgr (usrselectedcoords)

filename = str('../public/generated/GENERATED_' + usrselectedcoords + '_scale_' + usrselectedheight + '.stl')
numpy2stl((r.grid / int(usrselectedheight)),filename, solid=True)

