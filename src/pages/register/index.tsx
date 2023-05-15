import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useRouter } from 'next/router'

interface IFormInput {
  email: string;
  name: string;
  user: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required().min(2).max(100),
  user: yup.string().required().min(2).max(100),
  password: yup.string().required().min(8).max(120),
});

function Register() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInput) => {
    const resp = await axios.post(
      'http://localhost:3333/users', 
      data
    )
    if (resp?.status === 200) {
      localStorage.setItem('token', resp.data.token);
      router.push('/home')
    }
  };

  return (
    <Container maxWidth="xs" className="register-form">
      <Typography className="" variant="h3">
        Registrar-se
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="" noValidate>
        <TextField
          {...register("email")}
          variant="outlined"
          margin="normal"
          label="E-mail"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
          fullWidth
          required
        />
        <TextField
          {...register("name")}
          variant="outlined"
          margin="normal"
          label="Nome"
          helperText={errors.name?.message}
          error={!!errors.name?.message}
          fullWidth
          required
        />
        <TextField
          {...register("user")}
          variant="outlined"
          margin="normal"
          label="Usuario"
          helperText={errors.user?.message}
          error={!!errors.user?.message}
          fullWidth
          required
        />
        <TextField
          {...register("password")}
          variant="outlined"
          margin="normal"
          label="Senha"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className=""
        >
          Continuar
        </Button>
        <hr />
        <a href="/" className="login-url">Faca o seu login aqui.</a>
      </form>
    </Container>
  );
}

export default Register;