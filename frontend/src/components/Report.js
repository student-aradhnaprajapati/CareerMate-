import Plot from 'react-plotly.js'
export default function Printing(props) {
  console.log(props.p1);
  console.log(props.p2);

  return (
    <Plot
        data={[
          {
            x: props.p1,
            y: props.p2,
            type: 'bar',
            marker: { color: 'rgba(75,192,192,1)' },
          },
        ]}
        layout={{
          title: props.title,
          xaxis: { title: 'Field' },
          yaxis: { title: 'Percentage' },
        }}
      />
  )
}