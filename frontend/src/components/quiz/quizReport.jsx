import Plot from 'react-plotly.js';
import { useLocation, Link } from 'react-router-dom';

export default function QuizReport(props) {
    const location = useLocation();
    const { result_field, result_interest, pred_field, pred_interest } = location.state;
    const data = [
        {
            x: pred_field, // Categories
            y: pred_interest, // Data for Category A
            name: 'Predicted Interest by ML Model', // Label for Category A
            type: 'bar',
        },
        {
            x: result_field, // Categories
            y: result_interest, // Data for Category B
            name: 'Interest Calculated by Quiz Result', // Label for Category B
            type: 'bar',
        },
    ];

    const layout = {
        title: 'Comparison of Predicted vs Calculated Interests',
        barmode: 'group', // Group the bars for comparison
        xaxis: {
            title: 'Field',
        },
        yaxis: {
            title: 'Percentage Interest',
        },
    };

    return (
        <div>
            <Plot className='graph' 
                data={data}
                layout={layout}
            // style={{ width: '100%', height: '100%' }} // Makes the chart responsive
            />
            <br /><br /><br />
            <p className='ques'>Still Confused!</p>
            <Link to="/counsellor" className='link'>Go for Counselling</Link>
        </div>
    )
}