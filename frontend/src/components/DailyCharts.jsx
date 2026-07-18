import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function DailyCharts({ data }) {

    if (!data || data.length === 0) return null;

    return (
        <ResponsiveContainer width="90%" height={300}>
            <LineChart data={data}>
                {/* <CartesianGrid /> */}
                <XAxis dataKey="date" />
                <YAxis domain={[0, 25000]}/>
                <Tooltip />
                <Line dataKey="score" type="monotone" />
            </LineChart>
        </ResponsiveContainer>
    )
}
