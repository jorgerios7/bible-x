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

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { resetPassword, isSubmitting } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await resetPassword(email);
      Alert.alert('Email enviado', 'Confira sua caixa de entrada para redefinir sua senha.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Não foi possível enviar', error instanceof Error ? error.message : 'Tente novamente.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Recuperar senha</Text>
        <Text style={styles.subtitle}>Enviaremos um link seguro para o email cadastrado.</Text>
      </View>
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
      <GradientButton label="Enviar link" icon="email-fast-outline" onPress={handleSubmit} loading={isSubmitting} />
      <Button mode="text" textColor={colors.textSecondary} onPress={() => navigation.goBack()}>
        Voltar
      </Button>
    </ScreenContainer>
  );
};
