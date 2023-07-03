const work = new Worker('./closeworker.js');
work.onmessage = ({ data }) => {
  console.log(data);
};
