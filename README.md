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
At this point the system is ready to build a personalised dockerFile.


## 0, 1, 2 and 3 Layers
The **O_** layer allows to build a docker embedding a specific version of Python or R. User must provide the name of the folder, in which all libraries will be stored.
Clicking on *Config* user can edit the configuration file, used to build the dockerFile. In this configuration file  must be inserted all the commands referring to Python or R, which are required to load user selected libraries.
In case user wish to to create a docker embedding Python and R, it is needed  to flag **1_** layer and to provide the folder name for the merged docker.
To include in the new docker specific tools as jupyter notebook or jupyter lab, **2_** layer, it is required to create a docker embedding both Python and R. In this layer, must be iserted the name of the docker image will be built.
Layer **3_** offer the possiiblity to run docker or singularity containers in a docker.
