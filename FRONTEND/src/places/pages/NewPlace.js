import React, { useCallback, useReducer, useContext } from "react"
import { useHistory } from "react-router-dom"
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import ImageUpload from "../../shared/components/FormElements/ImageUpload"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import { AuthContext } from "../../shared/context/auth-context"
import './PlaceForm.css'


const NewPlace = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext)

  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },
    image: {
      value: null,
      isValid: false
    }
  }, false)

  const history = useHistory()

  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('address', formState.inputs.address.value)
      formData.append('image', formState.inputs.image.value)

      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`,
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );

      history.push('/')
    } catch (e) {

    }

  }



  return (

    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input element="input" type="text"
          id="title"
          label="Title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          id="description"
          label="Description"
          errorText="Please enter a valid description (at least 5 characters)"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="address"
          label="Address"
          errorText="Please enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="subit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  )
}

export default NewPlace