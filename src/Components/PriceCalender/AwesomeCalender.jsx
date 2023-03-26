import Calendar from "react-awesome-calendar";

const events = [
  {
    id: 1,
    color: "#c99822",
    from: "2022-06-05T18:00:00+00:00",
    to: "2022-06-05T19:00:00+00:00",
    title: "$500",
  },
  {
    id: 2,
    color: "#1ccb9e",
    from: "2019-05-01T13:00:00+00:00",
    to: "2019-05-05T14:00:00+00:00",
    title: "This is another event",
  },
  {
    id: 3,
    color: "#3694DF",
    from: "2019-05-05T13:00:00+00:00",
    to: "2019-05-05T20:00:00+00:00",
    title: "This is also another event",
  },
];

const AwesomeCalender = () => {
  return <Calendar events={events} />;
};

export default AwesomeCalender;
