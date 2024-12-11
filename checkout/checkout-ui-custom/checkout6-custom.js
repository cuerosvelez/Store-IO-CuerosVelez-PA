let timeoutGlobal
const mediaquery = window.matchMedia('(min-width: 1024px)')

/* ___ addi ___ */
addiAllySlug = 'cuerosvelez-ecommerce'
$.getScript('https://s3.amazonaws.com/statics.addi.com/vtex/js/vtex-checkout-co.bundle.min.js')
/* ___ fin addi ___ */

/* ___ validacion inputs ___ */
$(document).on('input', '#client-first-name, #client-last-name', function () {
  const input = $(this).val()
  const filteredInput = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') // Permite letras, espacios y caracteres especiales en español
  $(this).val(filteredInput.toUpperCase())
})

$(document).on('keydown', '#client-document', function (event) {
  const key = event.key

  // Permitir solo números, y teclas de control
  const allowedChars = '0123456789'

  // Permitir teclas de control como Backspace, Delete, Enter, Tab, y las flechas de dirección
  const controlKeys = ['Backspace', 'Delete', 'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

  // Si la tecla presionada no está en los caracteres permitidos ni es una tecla de control, prevenir la inserción
  if (!allowedChars.includes(key) && !controlKeys.includes(key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
  }
})

$(document).on('keydown', '#client-phone', function (event) {
  const key = event.key

  // Permitir solo números, paréntesis, guiones y teclas de control
  const allowedChars = '0123456789()-'

  // Permitir teclas de control como Backspace, Delete, Enter, Tab, y las flechas de dirección
  const controlKeys = ['Backspace', 'Delete', 'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

  // Si la tecla presionada no está en los caracteres permitidos ni es una tecla de control, prevenir la inserción
  if (!allowedChars.includes(key) && !controlKeys.includes(key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
  }
})

/* ___ fin validacion inputs ___ */

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const stepsCart = () => {
  const urlSegments = window.location.href.split('/'),
    currentPage = urlSegments[urlSegments.length - 1],
    $progressBar = $('progress'),
    $step = $('.stepHeader')

  switch (currentPage) {
    case 'cart':
      $progressBar.val(17)
      $step.css('display', 'none')
      break

    case 'email':
      $progressBar.val(34)
      $step.css('display', 'none')
      break

    case 'profile':
      $progressBar.val(51)
      $step.css('display', '')
      break

    case 'shipping':
      $progressBar.val(68)
      $step.css('display', '')
      break

    case 'payment':
      $progressBar.val(85)
      $step.css('display', '')
      break

    case 'confirmation':
      $progressBar.val(100)
      $step.css('display', 'none')
      break

    default:
      $progressBar.val(0)
      $step.css('display', 'none')
      break
  }
}

const buttonSticky = (item) => {
  const $container = $(item)
  const containerPosition = $container[0]?.getBoundingClientRect()

  if (containerPosition?.top >= 0 && containerPosition?.bottom - containerPosition?.height <= window.innerHeight) {
    $container?.addClass('btn-no-fixed')
  } else {
    $container?.removeClass('btn-no-fixed')
  }
}

const addCheckboxTerm = () => {
  // etTimeout(() => {

  // }, 500)

  if ($('.client-profile-data.active').length > 0 && $('.term-legal').length < 1) {
    $('.newsletter-text').text('Quiero recibir emails promocionales')
    $('.newsletter').after(`
          <p class="term-legal conditionTerm">
              <label class="checkbox label-legal conditionTerm-label">
                  <input required type="checkbox" id="opt-in-conditionTerm" class="checkbox-legal">
                  <span class="checkboxText-legal conditionTerm-text">He leído y acepto los términos y condiciones del sitio que puedes <a href="/" target="_blank">consultar aquí</a>*</span>
              </label>
          </p>
          <p class="term-legal policyTerm"></p>
              <label class="checkbox label-legal policyTerm-label">
                  <input required type="checkbox" id="opt-in-policyTerm" class="checkbox-legal">
                  <span class="checkboxText-legal policyTerm-text">Acepto la política de tratamiento de datos personales que puedes <a href="/" target="_blank">consultar aquí</a>*</span>
              </label>
          </p>
        `)
  }

  if ($('#opt-in-conditionTerm').is(':checked') && $('#opt-in-policyTerm').is(':checked')) {
    $('#go-to-shipping,#go-to-payment').attr('disabled', false)
  } else {
    $('#go-to-shipping,#go-to-payment').attr('disabled', true)
  }
}

const addPlaceholderCorporate = () => {
  $('#client-company-name').attr('placeholder', 'Razón Social*')
  $('#client-company-nickname').attr('placeholder', 'Nombre de la empresa*')
  $('#client-company-ie').attr('placeholder', 'NIT*')
  $('#client-company-document').attr('placeholder', 'RUT')
}

const addPlaceholderInfoUser = () => {
  $('#client-first-name').attr('placeholder', 'Nombre*')
  $('#client-last-name').attr('placeholder', 'Apellidos*')
  $('#client-phone').attr('placeholder', 'Teléfono / Móvil*')
  $('#client-email').attr('placeholder', 'Correo electrónico*')
  $('#client-document').attr('placeholder', 'Número de documento*')
}

const addParamsEnvio = async () => {
  await sleep(500)

  $('#ship-city option[value=""]').text('Municipio*').prop('disabled', true)
  $('#ship-state option[value=""]').text('Departamento*').prop('disabled', true)

  $('#ship-neighborhood').attr('placeholder', 'Barrio')
  $('#ship-receiverName').attr('placeholder', 'Destinatario')
  $('#ship-street').attr('placeholder', 'Ej: Calle 15A #54 - 20')
  $('#ship-complement').attr('placeholder', 'Información adicional (edificio, apto, casa, etc)')

  if (
    $('.vtex-omnishipping-1-x-shippingDataDev.active #ship-street').length > 0 &&
    $('.ship-street-fields').length < 1
  ) {
    $('.ship-street').before(`
          <p class="input ship-street-fields required text">
            <select name="street" id="ship-street-select" class="input-large input-large-street">
                <option value="selecciona" disabled selected>Tipo de vía</option>
                <option value="Avenida">Avenida</option>
                <option value="Calle">Calle</option>
                <option value="Carrera">Carrera</option>
                <option value="Circular">Circular</option>
                <option value="Diagonal">Diagonal</option>
                <option value="Transversal">Transversal</option>
                <option value="Autopista">Autopista</option>
                <option value="Kilometro">Kilometro</option>
                <option value="Circunvalar">Circunvalar</option>
                <option value="Manzana">Manzana</option>
                <option value="Apartado Aéreo">Apartado Aéreo</option>
            </select>

            <input disabled autocomplete="on" id="ship-street-1" type="text" placeholder="Ej: 15A" class="input-large input-large-street" />
            <span class="ship-street-span ship-street-span-1">#</span>
            <input disabled autocomplete="on" id="ship-street-2" type="text" placeholder="54" class="input-large input-large-street" />
            <span class="ship-street-span ship-street-span-2">-</span>
            <input disabled autocomplete="on" id="ship-street-3" type="text" placeholder="20" class="input-large input-large-street" />
        </p>
        `)
  }
}

const changeValField = (input, val) => {
  const ipt = input?.get(0)
  var c = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  c.call(ipt, val)
  val = new Event('input', {
    bubbles: !0,
  })
  ipt.dispatchEvent(val)
}

const paramsStreet = () => {
  let val = ''
  const ipt = $('#ship-street')
  const ipt1 = $('#ship-street-1').val()
  const ipt2 = $('#ship-street-2').val()
  const ipt3 = $('#ship-street-3').val()
  const sel = $('#ship-street-select').val()
  const ipts = $(`#ship-street-1, #ship-street-2, #ship-street-3`)

  if (sel) {
    ipts.prop('disabled', false)
    val = `${sel}${ipt1 ? ' ' + ipt1 : ''}${ipt2 ? ' # ' + ipt2 : ''}${ipt3 ? ' - ' + ipt3 : ''}`
  } else {
    ipts.val('')
    ipts.prop('disabled', true)
  }

  if (ipt1 && ipt2 && ipt3) {
    changeValField(ipt, val)
  } else if (ipt) {
    if (ipt.val()) {
      changeValField(ipt, '')
    }
    ipt.val(val)
  }
}

const changeResponse = () => {
  const minHSubTotal = $('body.body-cart-vertical .cart-active .summary-template-holder')
  if (mediaquery.matches) {
    minHSubTotal.css('min-height', $('.cart-more-options.span7').height())
  } else {
    minHSubTotal.css('min-height', '')
  }
}

const changeData = async () => {
  await sleep(500)
  stepsCart()
  changeResponse()
  addParamsEnvio()
  addCheckboxTerm()
  addPlaceholderInfoUser()
}

const stickyScroll = () => {
  buttonSticky('.cart-links-bottom')
  buttonSticky('.btn-submit-wrapper')
  buttonSticky('.payment-confirmation-wrap')
  buttonSticky('.vtex-omnishipping-1-x-submitPaymentButton')
}

$(document).on('change', '#ship-state', addParamsEnvio)
$(document).on('change', '#ship-street-select', paramsStreet)

$(document).on('click', '#is-corporate-client', addPlaceholderCorporate)
$(document).on('click', '#shipping-calculate-link, #new-address-button, #force-shipping-fields', addParamsEnvio)

$(document).on('click', '#opt-in-conditionTerm, #opt-in-policyTerm, .box-client-info-pf input', addCheckboxTerm)

$(document).on('click', '.checkout-container', () => {
  if (timeoutGlobal) {
    return
  }

  timeoutGlobal = setTimeout(() => {
    changeData()
    timeoutGlobal = null
  }, 1000)
})

// $(document).on('click', '.btn-success, .link-box-edit', changeData)
// $(document).on('click', '.link-cart', () => etTimeout(() => stepsCart(), 500))

$(document).on('input', '#ship-street-1, #ship-street-2, #ship-street-3', paramsStreet)
$(document).on(
  'input',
  ' #client-first-name, #client-last-name, #client-phone, #client-email, #client-document',
  addPlaceholderInfoUser
)

window.addEventListener('popstate', changeData)

$(document).ready(() => {
  $(window).on('scroll', stickyScroll)

  setTimeout(() => {
    changeData()
    stickyScroll()
  }, 500)
})
