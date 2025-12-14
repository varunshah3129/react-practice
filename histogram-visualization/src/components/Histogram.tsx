import { useEffect, useState } from "react";
import './Histogram.css';

export const Histogram = () => {

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

    return (
        <div className="histogram-container">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            {!loading && !error && (
                <div className="histogram-wrapper">
                    <div className="y-axis">
                        {(() => {
                            const maxFreq = Math.max(...Object.values(frequency), 0);
                            // Show only key labels: max, max/2, and 0 (or calculate reasonable steps)
                            const step = Math.ceil(maxFreq / 5) || 1; // 5 steps max
                            const labels = [];
                            for (let i = maxFreq; i >= 0; i -= step) {
                                labels.push(i);
                            }
                            // Always include 0 at the bottom
                            if (labels[labels.length - 1] !== 0) {
                                labels.push(0);
                            }
                            return labels.map((val, i) => (
                                <div key={i} className="y-label">
                                    {val}
                                </div>
                            ));
                        })()}
                    </div>
                    <div className="chart-area">
                        <div className="bars">
                            {Array.from({ length: 10}, (_, i) => {
                                const num = i + 1;
                                const count = frequency[num] || 0;
                                const maxFreq = Math.max(...Object.values(frequency), 10);
                                const height = maxFreq > 0 ? (count / maxFreq) * 100 : 0;
                                return (
                                    <div key={num} className="bar-wrapper">
                                        <div className="bar" style={{height: `${height}%`}}>
                                            {count > 0 && <span className="count">{count}</span>}
                                        </div>
                                        <div className="x-label">{num}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
             )}
        </div>
    );
}