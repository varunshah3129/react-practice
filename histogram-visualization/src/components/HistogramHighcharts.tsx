import { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const HistogramHighcharts = () => {

    const [frequency, setFrequency] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const text = await response.text();

            const parseNumber = text.split('\n').filter(line => line.trim() !== '').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));

            // Calculate frequency of each number
            const freq: Record<number, number> = {};
            parseNumber.forEach(num => {
                freq[num] = (freq[num] || 0) + 1;
            });

            setFrequency(freq);
            setLoading(false);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Prepare data for Highcharts
    // Convert frequency object to array format: [[1, count1], [2, count2], ...]
    const chartData = Array.from({ length: 10 }, (_, i) => {
        const num = i + 1;
        return [num, frequency[num] || 0];
    });

    // Highcharts configuration
    const options: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Number Frequency Histogram'
        },
        xAxis: {
            title: {
                text: 'Number'
            },
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        yAxis: {
            title: {
                text: 'Frequency'
            },
            min: 0
        },
        series: [{
            name: 'Frequency',
            type: 'column',
            data: chartData.map(([_, count]) => count)
        }],
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    format: '{y}'
                }
            }
        },
        credits: {
            enabled: false
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            
            {!loading && !error && (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            )}
        </div>
    );
}
