import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../store/slices/toastSlice";
import { loginSuccess } from "../store/slices/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);
      const { token, user } = response.data;
      dispatch(loginSuccess({ token, user }));
      showToast({ message: "Login successful!", severity: "success" });
      navigate("/workspace");
    } catch (err) {
      dispatch(
        showToast({
          message: err.response?.data?.message || "Login failed",
          severity: "error",
        })
      );
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await handleLogin(values);

        setSubmitting(false);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
          <Button
            type="button"
            component={RouterLink}
            to="/signup"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
