import { Text, View } from 'react-native';

import { colors } from '../../constants/colors';
import { shortNumber } from '../../utils/format';
import { styles } from './styles';

type StatChartItem = {
  label: string;
  value: number;
  colorIndex: number;
};

type StatChartProps = {
  data: StatChartItem[];
};

export const StatChart = ({ data }: StatChartProps) => {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={styles.track}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.max(18, (item.value / max) * 100)}%`,
                  backgroundColor: colors.chart[item.colorIndex] ?? colors.primary,
                },
              ]}
            />
          </View>
          <Text style={styles.value}>{shortNumber(item.value)}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};
