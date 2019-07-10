This is a coding test for position of frontend developer in Zeiss

## Objectives

Prototypical solution for displaying the collected data to our test users inside of a web browser.

**The objective is to give them an instant overview over the current health and activity of the installed machines**.

# API Documentation

### GET /api/v1/machines

The API root is situated at [https://machinestream.herokuapp.com](https://machinestream.herokuapp.com)
and digests / returns JSON only. CORS is enabled for all routes.

```json
{
  "data": [
    {
      "id": "c21f082e-625e-49ac-80c5-e0d46bf50258",
      "status": "idle",
      "machine_type": "microscope",
      "longitude": 48.09610228912977,
      "latitude": 11.52376716586951,
      "last_maintenance": "2017-04-01T17:00:00.000000Z",
      "install_date": "2015-04-15",
      "floor": 5
    },
    ...
  ]
}
```

### GET /api/v1/machines/{machine_id}

Returns a single machine with the last 10 events embedded

```json
{
  "data": {
      "id": "c21f082e-625e-49ac-80c5-e0d46bf50258",
      "status": "idle",
      "machine_type": "microscope",
      "longitude": 48.09610228912977,
      "latitude": 11.52376716586951,
      "last_maintenance": "2017-04-01T17:00:00.000000Z",
      "install_date": "2015-04-15",
      "floor": 5,
      "events": [
        {
          "timestamp": "2017-04-16T19:42:26.542614Z",
          "status": "running"
        },
        ...
      ]
  }
}
```

### Websocket Feed /api/v1/events

A speciality is the live connection which allows receiving a soft-realtime event stream of machine status updates which look like this:

```json
{
  "machine_id": "59d9f4b4-018f-43d8-92d0-c51de7d987e5",
  "id": "41bb0908-15ba-4039-8c4f-8b7b99260eb2",
  "timestamp": "2017-04-16T19:42:26.542614Z",
  "status": "running"
}
```

The status can be either idle, running, finished or errorred in which case they will be repaired automatically and a repaired event will be sent before resetting to idle again.

Your colleague has recommended the *phoenix* npm module to connect with the backend and has provided you with the following sample code:

```code
import { Socket } from "phoenix";

// Open Socket connection
const socket = new Socket("ws://machinestream.herokuapp.com/api/v1/events");
socket.connect();

// Join correct channel and log events
const channel = socket.channel("events", {});
channel.join();
channel.on("new", event => console.log(event));
```