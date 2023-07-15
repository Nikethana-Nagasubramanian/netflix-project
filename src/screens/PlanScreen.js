import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import db from '../firebase';
import './PlanScreen.css'

function PlanScreen() {
    const [products, setProduct] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect( () => {
        db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get().then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        db.collection("products").where("active", "==", true).get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProduct(products);
        });
    }, []);
    console.log(products);
    console.log(subscription);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url : window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async(snap) => {
            const {error, sessionId} = snap.data();
            if(error) {
                alert(`An error occurred : ${error.message}`);
            }

            if(sessionId) {
                const stripe = await loadStripe('pk_test_51NMkUFGNFl7jKtKEG829vP8yLfwSmx9NI0OKqb4BswOEt2nefBjh0Z9XfT6C0qobQ6j4dJxEG6IQHNaAlcSITlVl00XzgKpUOh')
                stripe.redirectToCheckout({sessionId})
            }
        })
    };

  return (
    <div className='planScreen'>
        <br />
        {subscription && <p>Renewal Date : {new Date(
            subscription?.current_period_end * 1000)
            .toLocaleDateString()}</p>}
        {Object.entries(products).map(([productId, productData]) => {
            const isCurrentPackage = productData.name?.toLowerCase()
            .includes(subscription?.role);
            return (
                <div key = {productId} 
                className = {`${
                    isCurrentPackage && "plansScreen__plans--disabled"
                } plansScreen__plans`}
                >
                    <div className="plansScreen__info">
                        <h3>{productData.name}</h3>
                        <h5>{productData.description}</h5>
                    </div>
                    <button className='plansScreen__checkout'
                    onClick={() => 
                    !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                        {isCurrentPackage ? 'Current plan' : 'Subscribe'}
                    </button>
                </div>
            );
        })}
    </div>
  )
}

export default PlanScreen