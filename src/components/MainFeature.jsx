import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Phone, MapPin, CreditCard, Cake, Coffee, Pizza, Check, X } from 'lucide-react'
import { format } from 'date-fns'

function MainFeature() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'), // Tomorrow
    time: '12:00',
    paymentMethod: 'card',
    specialRequests: '',
    items: [
      { id: 1, name: 'Birthday Cake', selected: false, options: ['Chocolate', 'Vanilla', 'Red Velvet'], selectedOption: 'Chocolate' },
      { id: 2, name: 'Cupcakes (6pcs)', selected: false, options: ['Assorted', 'Chocolate', 'Vanilla'], selectedOption: 'Assorted' },
      { id: 3, name: 'Cookies (12pcs)', selected: false, options: ['Chocolate Chip', 'Oatmeal', 'Sugar'], selectedOption: 'Chocolate Chip' },
      { id: 4, name: 'Bread Loaf', selected: false, options: ['White', 'Whole Wheat', 'Sourdough'], selectedOption: 'White' },
      { id: 5, name: 'Croissants (4pcs)', selected: false, options: ['Plain', 'Chocolate', 'Almond'], selectedOption: 'Plain' },
    ]
  })
  
  const [errors, setErrors] = useState({})
  const [orderComplete, setOrderComplete] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }
  
  const toggleItemSelection = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => 
        item.id === itemId 
          ? { ...item, selected: !item.selected }
          : item
      )
    })
  }
  
  const handleOptionChange = (itemId, option) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => 
        item.id === itemId 
          ? { ...item, selectedOption: option }
          : item
      )
    })
  }
  
  const validateStep = () => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
    } else if (step === 2) {
      const selectedItems = formData.items.filter(item => item.selected)
      if (selectedItems.length === 0) newErrors.items = "Please select at least one item"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }
  
  const prevStep = () => {
    setStep(step - 1)
  }
  
  const submitOrder = () => {
    if (validateStep()) {
      // Here you would typically send the order to your backend
      console.log("Order submitted:", formData)
      setOrderComplete(true)
    }
  }
  
  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      date: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
      time: '12:00',
      paymentMethod: 'card',
      specialRequests: '',
      items: formData.items.map(item => ({ ...item, selected: false }))
    })
    setStep(1)
    setOrderComplete(false)
  }
  
  const selectedItemsCount = formData.items.filter(item => item.selected).length
  
  return (
    <div className="card overflow-visible">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-t-xl">
        <h2 className="text-2xl font-bold">Custom Order Form</h2>
        <p className="opacity-90">Place a special order for pickup or delivery</p>
      </div>
      
      {!orderComplete ? (
        <>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      step === i 
                        ? 'bg-primary text-white' 
                        : step > i 
                          ? 'bg-secondary text-white' 
                          : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    {step > i ? <Check size={18} /> : i}
                  </div>
                  <span className={`text-sm ${
                    step >= i 
                      ? 'text-surface-800 dark:text-surface-200 font-medium' 
                      : 'text-surface-500 dark:text-surface-400'
                  }`}>
                    {i === 1 ? 'Customer Info' : i === 2 ? 'Select Items' : 'Review & Pay'}
                  </span>
                </div>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="label flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input ${errors.name ? 'border-accent' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-accent">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="label flex items-center gap-2">
                        <Phone size={16} className="text-primary" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`input ${errors.phone ? 'border-accent' : ''}`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-accent">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="label flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        <span>Delivery Address</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`input min-h-[80px] ${errors.address ? 'border-accent' : ''}`}
                        placeholder="Enter your delivery address"
                      ></textarea>
                      {errors.address && (
                        <p className="mt-1 text-sm text-accent">{errors.address}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="label flex items-center gap-2">
                          <Calendar size={16} className="text-primary" />
                          <span>Delivery Date</span>
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="input"
                          min={format(new Date(), 'yyyy-MM-dd')}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="label flex items-center gap-2">
                          <Clock size={16} className="text-primary" />
                          <span>Delivery Time</span>
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="input"
                        >
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Cake size={18} className="text-primary" />
                      <span>Select Items for Your Order</span>
                    </h3>
                    
                    {errors.items && (
                      <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm">
                        {errors.items}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {formData.items.map(item => (
                        <div 
                          key={item.id}
                          className={`p-4 rounded-lg border transition-all ${
                            item.selected 
                              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                              : 'border-surface-200 dark:border-surface-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div 
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  item.selected 
                                    ? 'bg-primary border-primary' 
                                    : 'border-surface-300 dark:border-surface-600'
                                }`}
                                onClick={() => toggleItemSelection(item.id)}
                              >
                                {item.selected && <Check size={12} className="text-white" />}
                              </div>
                              <h4 className="font-medium">{item.name}</h4>
                            </div>
                            
                            <div className="flex items-center">
                              {item.id === 1 && <Cake size={18} className="text-primary mr-1" />}
                              {item.id === 2 && <Cake size={18} className="text-secondary mr-1" />}
                              {item.id === 3 && <Coffee size={18} className="text-primary-dark mr-1" />}
                              {item.id === 4 && <Pizza size={18} className="text-secondary-dark mr-1" />}
                              {item.id === 5 && <Coffee size={18} className="text-accent mr-1" />}
                            </div>
                          </div>
                          
                          {item.selected && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-700"
                            >
                              <label className="label text-xs">Select Variant:</label>
                              <div className="flex flex-wrap gap-2">
                                {item.options.map(option => (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleOptionChange(item.id, option)}
                                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                                      item.selectedOption === option
                                        ? 'bg-primary text-white'
                                        : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="specialRequests" className="label">Special Requests or Instructions</label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="input min-h-[80px]"
                        placeholder="Any special instructions for your order..."
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="font-medium mb-4">Order Summary</h3>
                    
                    <div className="bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Customer Information</h4>
                          <p className="font-medium">{formData.name}</p>
                          <p className="text-sm">{formData.phone}</p>
                          <p className="text-sm">{formData.address}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Delivery Details</h4>
                          <p className="font-medium">
                            {new Date(formData.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p className="text-sm">
                            {formData.time.split(':')[0] > 12 
                              ? `${formData.time.split(':')[0] - 12}:${formData.time.split(':')[1]} PM`
                              : `${formData.time} AM`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">Selected Items</h4>
                    <div className="space-y-3 mb-6">
                      {formData.items.filter(item => item.selected).map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Variant: {item.selectedOption}</p>
                          </div>
                          <div className="flex items-center">
                            {item.id === 1 && <Cake size={18} className="text-primary" />}
                            {item.id === 2 && <Cake size={18} className="text-secondary" />}
                            {item.id === 3 && <Coffee size={18} className="text-primary-dark" />}
                            {item.id === 4 && <Pizza size={18} className="text-secondary-dark" />}
                            {item.id === 5 && <Coffee size={18} className="text-accent" />}
                          </div>
                        </div>
                      ))}
                      
                      {formData.specialRequests && (
                        <div className="p-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg">
                          <h4 className="text-sm text-surface-500 dark:text-surface-400 mb-1">Special Instructions</h4>
                          <p className="text-sm">{formData.specialRequests}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <CreditCard size={18} className="text-primary" />
                        <span>Payment Method</span>
                      </h4>
                      
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border border-surface-200 dark:border-surface-700 rounded-lg cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Pay securely with your card</p>
                          </div>
                        </label>
                        
                        <label className="flex items-center p-3 border border-surface-200 dark:border-surface-700 rounded-lg cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={formData.paymentMethod === 'cash'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Pay when your order arrives</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-surface-600 dark:text-surface-300">Items Total</span>
                        <span className="font-medium">${(selectedItemsCount * 15).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-surface-600 dark:text-surface-300">Delivery Fee</span>
                        <span className="font-medium">${selectedItemsCount > 0 ? '5.00' : '0.00'}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-surface-200 dark:border-surface-700">
                        <span>Total</span>
                        <span className="text-primary">${selectedItemsCount > 0 ? (selectedItemsCount * 15 + 5).toFixed(2) : '0.00'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-6 border-t border-surface-200 dark:border-surface-700 flex justify-between">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="btn btn-outline"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                onClick={nextStep}
                className="btn btn-primary"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={submitOrder}
                className="btn btn-primary"
              >
                Place Order
              </button>
            )}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-8 text-center"
        >
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-secondary" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Thank you for your order. We'll contact you shortly to confirm the details.
          </p>
          
          <div className="bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-medium mb-2">Order Details</h4>
            <p className="text-sm mb-1"><span className="text-surface-500 dark:text-surface-400">Name:</span> {formData.name}</p>
            <p className="text-sm mb-1"><span className="text-surface-500 dark:text-surface-400">Delivery Date:</span> {new Date(formData.date).toLocaleDateString()}</p>
            <p className="text-sm mb-1"><span className="text-surface-500 dark:text-surface-400">Items:</span> {formData.items.filter(item => item.selected).length}</p>
            <p className="text-sm"><span className="text-surface-500 dark:text-surface-400">Payment Method:</span> {formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
          </div>
          
          <button 
            onClick={resetForm}
            className="btn btn-primary"
          >
            Place Another Order
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default MainFeature