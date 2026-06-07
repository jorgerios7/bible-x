import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput } from 'react-native-paper';

import { GradientButton } from '../../components/GradientButton';
import { GradientLogo } from '../../components/GradientLogo';
import { ScreenContainer } from '../../components/ScreenContainer';
import { colors } from '../../constants/colors';
import { useAuth } from '../../hooks/useAuth';
import type { AuthStackParamList } from '../../types';
import { styles } from './styles';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { signIn, isSubmitting } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleSubmit = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Não foi possível entrar', error instanceof Error ? error.message : 'Tente novamente.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <GradientLogo />
      <View style={styles.header}>
        <Text style={styles.title}>Entre na sua jornada</Text>
        <Text style={styles.subtitle}>Leia, pesquise, converse com IA e organize seus estudos.</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email-outline" color={colors.textSecondary} />}
          textColor={colors.textPrimary}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          style={styles.input}
          outlineStyle={styles.inputOutline}
        />
        <TextInput
          mode="outlined"
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          left={<TextInput.Icon icon="lock-outline" color={colors.textSecondary} />}
          right={
            <TextInput.Icon
              icon={secureText ? 'eye-outline' : 'eye-off-outline'}
              color={colors.textSecondary}
              onPress={() => setSecureText((current) => !current)}
            />
          }
          textColor={colors.textPrimary}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          style={styles.input}
          outlineStyle={styles.inputOutline}
        />
        <GradientButton label="Entrar" icon="login" onPress={handleSubmit} loading={isSubmitting} />
        <Button mode="text" textColor={colors.textSecondary} onPress={() => navigation.navigate('Register')}>
          Cadastrar
        </Button>
        <Button mode="text" textColor={colors.textSecondary} onPress={() => navigation.navigate('ForgotPassword')}>
          Esqueci minha senha
        </Button>
      </View>
    </ScreenContainer>
  );
};
