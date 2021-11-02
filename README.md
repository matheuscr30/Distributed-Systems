# Distributed Systems

A simple distribute system and multiplatform application for matches between devs and recruiters.

* For communication between client and servers, GRPC is been used, even in internal requests
* For scale and share data between servers, I implemented a chord ring with servers
* For efficient saving data, Log Structured Merge Tree is been used in each server

## Installation

1. Install Docker
2. Install Docker-Compose

## Usage

In this application you can register as 2 users:
* A Recruiter:
   * Can send message to the global chat
   * Match any employee which is talking in the chat
   * Contact the employee if match is acceptedd
* An Employee
   * Can send message to the global chat
   * Accept/Refuse a match

### Start
To start the application you need to pass 4 flags:
* Build
  * hard: Delete images and network from Docker, rebuild again and start the containers
  * soft: Just start the containers
* Mode
  * dae: Run the containers in mode daemon
  * it: Run the containers in mode interactive
* Servers: Number of servers to build
* Volumes
  * keep: Keep the volumes of old running containers
  * purge: Purge the volumes and create new ones

```bash
./build.sh --build build_opt --mode mode_opt --servers nr_servers --volumes volume_opt
```

### Stop
```bash
./stop.sh
```
## Used Technologies
* Python / Flask
* HTML, CSS, JS
* Chord (https://en.wikipedia.org/wiki/Chord_(peer-to-peer))
* Log Structured Merge Tree (LSMT) (https://en.wikipedia.org/wiki/Log-structured_merge-tree)
* GRPC (https://grpc.io/)

## Authors

* **Matheus Cunha Reis** - *creator* - [GitHub](https://github.com/matheuscr30) ✌

## License
[MIT](https://choosealicense.com/licenses/mit/)
