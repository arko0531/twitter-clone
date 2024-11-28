import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import {
  Error,
  Input,
  Form,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';
import { FirebaseError } from 'firebase/app';
import GithubButton from '../components/github-btn';

export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if (isLoading || name === '' || email === '' || password === '') return;

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);

      await updateProfile(credentials.user, {
        displayName: name,
      });

      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }

    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>Join into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name='name'
          value={name}
          placeholder='Name'
          type='text'
          onChange={onChange}
          required
        />
        <Input
          name='email'
          value={email}
          placeholder='Email'
          type='email'
          onChange={onChange}
          required
        />
        <Input
          name='password'
          value={password}
          placeholder='Password'
          type='password'
          onChange={onChange}
          required
        />
        <Input
          type='submit'
          value={isLoading ? 'loading...' : 'Create Account'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to='/login'>Log in &rarr;</Link>
      </Switcher>
      <Switcher>
        Forgot your password?{' '}
        <Link to='/password-reset'>Reset your password &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
