## **CLI Aliases for Docker and Kubernetes**

To streamline working with Docker and Kubernetes, this project includes predefined CLI aliases that save time and reduce repetitive typing. These aliases are particularly useful for frequent operations in containerized environments and Kubernetes clusters.

### **Docker Aliases**
These aliases simplify common Docker commands, making it faster to manage containers, images, and logs:
- **`d`**: Shorthand for `docker`.
- **`dps`**: Lists all running containers (`docker ps`).
- **`dbuild`**: Builds a Docker image with a specified tag (`docker build -t`).
- **`dimg`**: Lists all Docker images on your machine (`docker images`).
- **`drm`**: Removes a Docker container (`docker rm`).
- **`drmi`**: Removes a Docker image (`docker rmi`).
- **`dstop`**: Stops a running container (`docker stop`).
- **`dkill`**: Force-stops a running container (`docker kill`).
- **`drun`**: Runs a Docker container interactively (`docker run -it`).
- **`dexec`**: Executes a command in a running container interactively (`docker exec -it`).
- **`dlogs`**: Fetches logs from a running container (`docker logs`).

### **Kubernetes Aliases**
These aliases make managing Kubernetes resources faster and easier:
- **`k`**: Shorthand for `kubectl`.
- **`kgps`**: Lists all pods in the current namespace (`kubectl get pods`).
- **`kgds`**: Lists all deployments in the current namespace (`kubectl get deployments`).
- **`kgss`**: Lists all services in the current namespace (`kubectl get services`).
- **`kdes`**: Describes a specific Kubernetes resource (`kubectl describe`).
- **`kdel`**: Deletes a specified Kubernetes resource (`kubectl delete`).
- **`klogs`**: Fetches logs from a specific pod (`kubectl logs`).

### **How to Use These Aliases**

To use these aliases, follow these steps:

1. Open your shell configuration file (e.g., `.bashrc`, `.zshrc`, or `.bash_profile`) using an editor of your choice. If you're using VS Code, you can run:

   ```bash
   code ~/.zshrc  # For Zsh shell users
   code ~/.bashrc  # For Bash shell users
   code ~/.bash_profile  # If you're using Bash with a profile file
   ```

2. Copy and paste the alias list provided in this README into the file.

3. Save the changes and reload your terminal session by running:

   ```bash
   source ~/.zshrc  # For Zsh shell
   source ~/.bashrc  # For Bash shell
   source ~/.bash_profile  # For Bash with profile
   ```

Now, you can use these commands directly in the terminal to speed up Docker and Kubernetes workflows.