// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material'

// ** axios
import axios from 'axios'

// ** Components
import RegisterProduct from 'src/views/supplier/RegisterProduct'
import ShowResults from 'src/views/supplier/show-results'

// ** Switch Alert Import
const Swal = require('sweetalert2')

const RegisterProductPage = ({ productCategories }) => {
  const steps = ['Register Product', 'Show Results']
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const productOptionsInit = [
    {
      optionId: 1,
      optionName: '',
      optionValidation: 0,
      optionType: 1,
      optionValue: [{ valueId: 1, valueName: '' }]
    }
  ]
  const [productOptions, setProductOptions] = useState(productOptionsInit)

  const productOptionGroupsInit = {
    optionGroupId: 1,
    optionGroupColumn1: '',
    optionGroupColumn2: '',
    optionGroupColumn3: '',
    optionGroupColumn4: '',
    optionGroupColumn5: '',
    optionGroupPrice: null,
    optionGroupQuantity: null,
    optionGroupValidation: 0
  }

  const [productOptionGroups, setProductOptionGroups] = useState([productOptionGroupsInit])

  const isStepOptional = step => {
    return step === 1
  }

  const isStepSkipped = step => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    } else if (activeStep === 0) {
      let hasOptionError = false
      let optionValidationIndex = null
      let hasOptionGroupError = false

      const newProductOptions = productOptions.map((option, index) => {
        if (option.optionName === '') {
          hasOptionError = true

          return { ...option, optionValidation: 1 }
        }

        optionValidationIndex = index + 1

        return option
      })

      if (optionValidationIndex !== null) {
        const newProductOptionGroups = productOptionGroups.map(optionGroup => {
          for (let i = 0; i < optionValidationIndex; i++) {
            if (optionGroup[`optionGroupColumn${i + 1}`] === '') {
              hasOptionGroupError = true
              console.log('test')

              return { ...optionGroup, optionGroupValidation: 1 }
            }
          }

          return optionGroup
        })
      }

      if (hasOptionError) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all Option fields!'
        })
      }

      if (hasOptionGroupError) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all Option Group fields!'
        })
      }

      if (!hasOptionError && !hasOptionGroupError) {
        setProductOptions(newProductOptions)
        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkipped(newSkipped)
      }
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
      setSkipped(newSkipped)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  useEffect(() => {
    console.log(productCategories)
  }, [productCategories])

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant='caption'>Optional</Typography>
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <RegisterProduct
              productOptions={productOptions}
              setProductOptions={setProductOptions}
              productOptionGroups={productOptionGroups}
              setProductOptionGroups={setProductOptionGroups}
              productCategories={productCategories}
            />
          )}
          {activeStep === 1 && (
            <ShowResults productOptions={productOptions} productOptionGroups={productOptionGroups} />
          )}
          {activeStep === 2 && 'test'}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button size='large' onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product_category.allcategorys`)
    const productCategories = res.data.message.Data

    return {
      props: { productCategories: productCategories }
    }
  } catch (error) {
    console.log(error)

    return {
      props: { productCategories: [] }
    }
  }
}

export default RegisterProductPage
