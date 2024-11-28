import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';

export default function PasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await sendPasswordResetEmail(auth, email);
      alert('The email was sent successfully.');
      navigate('/');
    } catch (error) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Reset your password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name='email'
          value={email}
          placeholder='Email'
          type='email'
          onChange={onChange}
          required
        />
        <Input
          type='submit'
          value={isLoading ? 'loading...' : 'Send an email'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to='/login'>Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
