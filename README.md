# dockerFileGeneratorGUI
This package was built to to extend the level of reproducibility, modulability and portability of a conventional dockerFile.
This package provides the possibility to build complex dockerFiles using a graphical interface. Furthermore, the tool store locally R and python libraries. The docker folders are compatible to be uploaded on github, since they are splitted to keep each file below 24 Mb.

## Prerequisites
For windows install:
- https://docs.microsoft.com/en-gb/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
- https://hub.docker.com/editions/community/docker-ce-desktop-windows

For linux install:
- https://docs.docker.com/engine/install/ubuntu/

For OsX install: 
- https://docs.docker.com/desktop/mac/install/

## Running dockerFileGeneratorGUI
Download and unzip this github or clone it
Execute, from a terminal, *dockerFileGenerator.sh*, for Linux and MAC OSX, and *dockerFileGenerator.cmd*, if you are running Windows.
Ones the script seems to hang, open a web browser and browse http://localhost:3000/
At this point you are ready to build you personalised dockerFile.
