import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput } from 'react-native-paper';

import { GradientButton } from '../../components/GradientButton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { colors } from '../../constants/colors';
import { useAuth } from '../../hooks/useAuth';
import type { AuthStackParamList } from '../../types';
import { styles } from './styles';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { signUp, isSubmitting } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await signUp(name, email, password);
    } catch (error) {
      Alert.alert('Cadastro não concluído', error instanceof Error ? error.message : 'Tente novamente.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Seu espaço de leitura, favoritos, notas e conversas bíblicas.</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Nome"
          value={name}
          onChangeText={setName}
          left={<TextInput.Icon icon="account-outline" color={colors.textSecondary} />}
          textColor={colors.textPrimary}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          style={styles.input}
          outlineStyle={styles.inputOutline}
        />
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
          secureTextEntry
          left={<TextInput.Icon icon="lock-outline" color={colors.textSecondary} />}
          textColor={colors.textPrimary}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          style={styles.input}
          outlineStyle={styles.inputOutline}
        />
        <GradientButton label="Cadastrar" icon="account-plus-outline" onPress={handleSubmit} loading={isSubmitting} />
        <Button mode="text" textColor={colors.textSecondary} onPress={() => navigation.goBack()}>
          Já tenho uma conta
        </Button>
      </View>
    </ScreenContainer>
  );
};
