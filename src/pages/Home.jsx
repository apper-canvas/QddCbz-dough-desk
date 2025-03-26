import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ShoppingCart, Plus, Minus } from 'lucide-react'
import MainFeature from '../components/MainFeature'

// Sample product data
const bakeryProducts = [
  {
    id: 1,
    name: "Sourdough Bread",
    description: "Artisanal sourdough with a crispy crust and chewy interior",
    category: "Bread",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1585478259715-4d3a5428a6f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    availableQuantity: 15
  },
  {
    id: 2,
    name: "Chocolate Croissant",
    description: "Buttery, flaky pastry filled with rich chocolate",
    category: "Pastries",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    availableQuantity: 20
  },
  {
    id: 3,
    name: "Blueberry Muffin",
    description: "Moist muffin packed with fresh blueberries",
    category: "Muffins",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    availableQuantity: 12
  },
  {
    id: 4,
    name: "Cinnamon Roll",
    description: "Soft, gooey roll with cinnamon swirl and cream cheese frosting",
    category: "Pastries",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    availableQuantity: 8
  },
  {
    id: 5,
    name: "Baguette",
    description: "Traditional French bread with a crispy exterior",
    category: "Bread",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    availableQuantity: 10
  },
  {
    id: 6,
    name: "Red Velvet Cupcake",
    description: "Classic red velvet with cream cheese frosting",
    category: "Cakes",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    availableQuantity: 15
  }
]

const categories = ["All", "Bread", "Pastries", "Muffins", "Cakes"]

function Home() {
  const [products] = useState(bakeryProducts)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showCart, setShowCart] = useState(false)
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }
  
  // Remove product from cart
  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId)
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId))
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ))
    }
  }
  
  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)
  
  // Calculate total price
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-3/4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Product Catalog</h2>
            <p className="text-surface-600 dark:text-surface-400">Browse our freshly baked goods and place your order</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-surface-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-surface-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input pl-10 appearance-none pr-8"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-primary hover:bg-primary-dark text-white p-2 rounded-full shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="Add to cart"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="badge badge-secondary">{product.category}</span>
                    <span className="text-xs text-surface-500 dark:text-surface-400">
                      {product.availableQuantity} available
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-surface-500 dark:text-surface-400">No products found. Try a different search term or category.</p>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/4 sticky top-24">
          <div className="card">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <h3 className="font-semibold">Your Cart</h3>
              <div className="relative">
                <ShoppingCart size={20} className="text-primary" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-surface-500 dark:text-surface-400 text-sm text-center py-4">
                  Your cart is empty. Add some delicious items!
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto scrollbar-hide">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-surface-600 dark:text-surface-400">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                                aria-label="Remove item"
                              >
                                <Minus size={14} />
                              </button>
                              <button 
                                onClick={() => addToCart(item)}
                                className="p-1 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                                aria-label="Add item"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-surface-600 dark:text-surface-400">Tax (10%)</span>
                      <span className="font-medium">${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary">${(cartTotal * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary w-full mt-4">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <MainFeature />
      </div>
    </div>
  )
}

export default Home