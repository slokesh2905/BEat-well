import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import json
import os

# Sample training data
training_data = np.array([
    [45, 1, 170, 75, 26, 120, 80, 1, 0, 1, 2, 200, 0, 1],
    [55, 0, 165, 68, 25, 140, 90, 2, 1, 0, 1, 240, 1, 0],
    [35, 1, 180, 82, 25.3, 118, 76, 1, 0, 0, 3, 180, 0, 0],
    [62, 0, 160, 65, 25.4, 150, 95, 3, 0, 0, 1, 260, 1, 1],
    [50, 1, 175, 78, 25.5, 130, 85, 1, 1, 1, 2, 220, 0, 1]
])

training_labels = np.array([0, 1, 0, 1, 0])

def create_model():
    model = Sequential([
        Dense(32, activation='relu', input_shape=(14,)),
        Dropout(0.2),
        Dense(16, activation='relu'),
        Dropout(0.1),
        Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(0.001),
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def train_model():
    # Create and train model
    model = create_model()
    
    # Calculate normalization parameters
    data_mean = training_data.mean(axis=0)
    data_std = training_data.std(axis=0)
    
    # Normalize the data
    normalized_data = (training_data - data_mean) / data_std
    
    # Train the model
    model.fit(
        normalized_data,
        training_labels,
        epochs=100,
        batch_size=32,
        validation_split=0.2,
        verbose=1
    )
    
    # Save the model and normalization parameters
    save_dir = './server/model/weights'
    os.makedirs(save_dir, exist_ok=True)
    
    model.save(os.path.join(save_dir, 'model.h5'))
    
    norm_params = {
        'mean': data_mean.tolist(),
        'std': data_std.tolist()
    }
    
    with open(os.path.join(save_dir, 'norm_params.json'), 'w') as f:
        json.dump(norm_params, f, indent=2)

if __name__ == '__main__':
    train_model()