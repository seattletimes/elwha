rm -rf frames
mkdir frames

avconv -i small.mp4 -vf scale=375:-1 -r 10 frames/%04d.png
montage -border 0 -geometry 375x -tile 6x -quality 60% frames/*.png video.jpg

