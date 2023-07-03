# CREDOgui
This tool is designed to to extend the level of reproducibility, modulability and portability of conventional dockerFiles.
This tool provides the possibility to build complex dockerFiles using a graphical interface. Furthermore, the tool stores locally R and Python libraries. The docker folders are compatible to be uploaded on github, since they are splitted to keep each file below 24 Mb.
Here is the video tutorial for CREDOgui [https://youtu.be/92RvJe6qqHQ]

## Prerequisites
For windows install:
- https://docs.microsoft.com/en-gb/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
- https://hub.docker.com/editions/community/docker-ce-desktop-windows

For linux install:
- https://docs.docker.com/engine/install/ubuntu/

For OsX install: 
- https://docs.docker.com/desktop/mac/install/

## Running CREDOgui
Download and unzip this github or clone it
Execute, from a terminal, *dockerFileGenerator.sh*, for Linux and MAC OSX, and *dockerFileGenerator.cmd*, if you are running Windows.
Ones the script seems to hang, open a web browser and browse http://localhost:3000/
At this point the system is ready to build a personalised dockerFile.

### 0, 1, 2, 3 and 4 Layers
The O_ layer in our system allows users to build a Docker image that embeds a specific version of Python or R. Users need to provide a folder name where all the required libraries will be stored.
By clicking on the Config button, users can edit the configuration file used to build the Dockerfile. This configuration file should contain the necessary commands for loading the user-selected libraries related to Python or R.
If users wish to create a Docker image that embeds both Python and R, they need to select the 1_ layer and provide a folder name for the merged Docker image.
To include a GUI accessible by web browser, like Jupyter Notebook or Jupyter Lab in the new Docker image, the 2_ layer is required. In this layer, users must specify the name of the Docker image to be built (rStudio and visual studio are also provided).
The 3_ layer offers the option to run Docker or Singularity containers within a Docker image.
To initiate the Docker building process, users can press the Start Docker Generation button. This action will create the Dockerfile, and in the Docker folder, all the required libraries and dependencies necessary to build the Docker image will be stored.
This system aims to provide users with a convenient way to generate Docker images tailored to their specific needs, ensuring the inclusion of the desired libraries and tools while maintaining reproducibility and ease of use.
### Output console
The output console provides the state of the dockerFile creation.
The output console will not show all the standard output but just a summa. For the details a log file is generated in the main folder of CREDOgui.

# Post dockerFile creation
**If Jupter, RStudio or visualStudio are present** the docker folder will have the extension referring to the installed tool, e.g. _jupyter_lab.
In the above mentioned folder, there is the script.sh (Linux/MAC OSX) or script.cmd (Windows), execute it and browse http://localhost:8888/
Please note that the **/sharedFolder** is the mount in the docker containier of the folder where the scripts.sh is located.
**If Jupter, RStudio or visualStudio are not present** still a script.sh/cmd will be provided, and it will run the docker in a terminal window.
The user can directly use the docker through that terminal window. 

# Docker creation Failure
In the event of a failure during the Docker file generation process, it is essential to perform the following checks:
1)Ensure that the names of the libraries provided in the 0_(python/R) layers are correct and that the appropriate command has been used. For example, certain libraries like GenomicRanges cannot be downloaded from CRAN but must be obtained from Bioconductor. It is crucial to use the correct package manager or repository to download the required libraries. \\
2)Verify that you have a stable internet connection. Despite implementing numerous checks, the Docker file generation process is susceptible to connection drops. Occasionally, files may be downloaded incompletely or become corrupted, leading to subsequent errors during the Docker build. A reliable and uninterrupted internet connection is necessary to ensure successful Docker file generation. //
3)Ensure that you have sufficient disk space available. It is generally recommended to have at least twenty gigabytes of free disk space for Docker image creation. The process involves downloading and storing various dependencies, libraries, and software components, which can occupy a significant amount of disk space. Having an adequate amount of free space on your disk will prevent any issues related to insufficient storage during the Docker file generation.
//
If you encounter a bug or experience difficulties with the Docker file generation, please provide the following information when seeking assistance://
1)Operating system: Specify the operating system you are using (e.g., Windows, macOS, Linux) and the version.//
2)Detailed selection and configuration of each layer: Provide the exact selection and settings for each layer, including the libraries being installed and any additional configurations applied. //
Attach the complete log file: Include the log file generated during the Docker file generation process. The log file contains important information about the steps performed and any error messages encountered. Attaching the complete log file will help the support team in diagnosing and resolving the issue effectively.
By providing these details, you enable the support team to understand and reproduce the issue, leading to a more efficient resolution of any problems encountered.
//These guidelines aim to assist users in troubleshooting Docker file generation failures and ensure a smooth experience with the tool. If you need further assistance, please don't hesitate to reach out.
