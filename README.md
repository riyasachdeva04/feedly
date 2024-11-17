# Kafka Streaming System

A simple Node.js application demonstrating event streaming with Apache Kafka, featuring an Admin, Producer, and Consumer.

## Components

1. **Admin**: Manages Kafka topics.
2. **Producer**: Sends rider location updates to a Kafka topic.
3. **Consumer**: Processes messages from a Kafka topic.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org)
- [Apache Kafka](https://kafka.apache.org/documentation/#gettingStarted)
- Zookeeper (bundled with Kafka)
- `kafka.js` (install via `npm install kafka.js`)

### Docker Setup for Kafka and Zookeeper

1. **Run Zookeeper**:
   ```bash
   docker run -p 2181:2181 zookeeper
   ```
2. **Run Kafka**:
   ```bash
   docker run -p 9092:9092 \
   -e KAFKA_ZOOKEEPER_CONNECT=<your-ip> \
   -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<your-ip> \
   -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
   confluentinc/cp-kafka
   ```



---

## Running the System

1. **Admin**: Create the topic.
   ```bash
   node admin.js
   ```

2. **Consumer**: Run with a group name.
   ```bash
   node consumer.js <group-name>
   ```

3. **Producer**: Input rider updates in the format `<ridername> <location>`.
   ```bash
   node producer.js
   ```

